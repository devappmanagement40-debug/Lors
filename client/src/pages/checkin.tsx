import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  DEFAULT_FORTUNE_WHEEL_CONFIG,
  getFortuneWheelLossRotationDegrees,
  getFortuneWheelRotationDegrees,
  getFortuneWheelSpinRotation,
  type FortuneWheelSegment,
} from "@shared/fortune-wheel";
import { getCurrencyLabel } from "@shared/currency";
import CheckinGameVisual from "./checkin-game-visual";

interface FortuneWheelStatus {
  availableSpins: number;
  segments: FortuneWheelSegment[];
}

interface ClaimResponse {
  success: boolean;
  won: boolean;
  amount: number | null;
  prizeIndex: number | null;
  prizeId: string | null;
  prizeType: "cash" | "product" | "loss";
  productName: string | null;
  lossBoundaryIndex: number | null;
  availableSpins: number;
  segments: FortuneWheelSegment[];
  message?: string;
}

const SPIN_DURATION_MS = 5_450;
const DEFAULT_SEGMENTS: FortuneWheelSegment[] = DEFAULT_FORTUNE_WHEEL_CONFIG.prizes.map((prize) => ({
  id: prize.id,
  type: prize.type,
  label: prize.type === "cash" ? `${prize.amount} CDF` : "Produit",
  amount: prize.type === "cash" ? prize.amount : null,
  productId: prize.type === "product" ? prize.productId : null,
  enabled: prize.enabled,
}));

function readSpinRequestId(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storeSpinRequestId(key: string, requestId: string) {
  try {
    window.sessionStorage.setItem(key, requestId);
  } catch {
    // The in-memory id still protects repeated clicks in this page session.
  }
}

function removeSpinRequestId(key: string) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // The request result has already been confirmed by the server.
  }
}

function formatAmount(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CheckinPage() {
  const { user, refreshUser } = useAuth();
  const [wheelRotationDegrees, setWheelRotationDegrees] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultAmount, setResultAmount] = useState<number | null>(null);
  const [isLossResult, setIsLossResult] = useState(false);
  const [isProductResult, setIsProductResult] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [segments, setSegments] = useState<FortuneWheelSegment[]>(DEFAULT_SEGMENTS);
  const [isNoSpinsModalOpen, setIsNoSpinsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const spinTimer = useRef<number | null>(null);
  const spinRequestId = useRef<string | null>(null);
  const spinRequestStorageKey = user ? `fortune-wheel-spin:${user.id}` : null;

  const statusQuery = useQuery<FortuneWheelStatus>({
    queryKey: ["/api/fortune-wheel/status"],
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (statusQuery.data?.segments?.length) setSegments(statusQuery.data.segments);
  }, [statusQuery.data?.segments]);

  useEffect(() => {
    if (!spinRequestStorageKey) return;
    const savedRequestId = readSpinRequestId(spinRequestStorageKey);
    if (savedRequestId && /^[0-9a-f-]{36}$/i.test(savedRequestId)) {
      spinRequestId.current = savedRequestId;
    }
  }, [spinRequestStorageKey]);

  const clearSpinRequestId = () => {
    spinRequestId.current = null;
    if (spinRequestStorageKey) {
      removeSpinRequestId(spinRequestStorageKey);
    }
  };

  useEffect(() => () => {
    if (spinTimer.current !== null) window.clearTimeout(spinTimer.current);
  }, []);

  const claimMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const response = await apiRequest("POST", "/api/fortune-wheel/spin", { requestId });
      return response.json() as Promise<ClaimResponse>;
    },
    onMutate: () => {
      setErrorMessage(null);
      setResultAmount(null);
      setIsLossResult(false);
      setIsProductResult(false);
      setResultMessage(null);
      setIsNoSpinsModalOpen(false);
    },
    onSuccess: (result) => {
      const resultSegments = result.segments?.length ? result.segments : segments;
      if (result.segments?.length) setSegments(result.segments);
      const resultIndexIsValid =
        typeof result.prizeIndex === "number" &&
        Number.isInteger(result.prizeIndex) &&
        result.prizeIndex >= 0 &&
        result.prizeIndex < resultSegments.length;
      const winningSegment = resultIndexIsValid
        ? resultSegments[result.prizeIndex as number]
        : null;
      const validCashWin =
        result.won === true &&
        result.prizeType === "cash" &&
        winningSegment?.type === "cash" &&
        winningSegment.enabled &&
        winningSegment.id === result.prizeId &&
        typeof result.amount === "number" &&
        winningSegment.amount === result.amount &&
        result.amount > 0 &&
        result.lossBoundaryIndex === null;
      const validProductWin =
        result.won === true &&
        result.prizeType === "product" &&
        winningSegment?.type === "product" &&
        winningSegment.enabled &&
        winningSegment.id === result.prizeId &&
        result.amount === null &&
        typeof result.productName === "string" &&
        result.productName.length > 0 &&
        result.lossBoundaryIndex === null;
      const validLoss =
        result.won === false &&
        result.prizeType === "loss" &&
        result.amount === null &&
        result.prizeIndex === null &&
        result.prizeId === null &&
        typeof result.lossBoundaryIndex === "number" &&
        Number.isInteger(result.lossBoundaryIndex) &&
        result.lossBoundaryIndex >= 0 &&
        result.lossBoundaryIndex < resultSegments.length;

      if (!result.success || (!validCashWin && !validProductWin && !validLoss)) {
        setErrorMessage("Le résultat du tirage n'a pas pu être vérifié.");
        void refreshUser();
        void queryClient.invalidateQueries({ queryKey: ["/api/fortune-wheel/status"] });
        return;
      }

      clearSpinRequestId();
      const targetRotation = result.won
        ? getFortuneWheelRotationDegrees(result.prizeIndex as number, 5, resultSegments.length)
        : getFortuneWheelLossRotationDegrees(result.lossBoundaryIndex as number, 5, resultSegments.length);
      if (spinTimer.current !== null) window.clearTimeout(spinTimer.current);
      setWheelRotationDegrees((current) =>
        getFortuneWheelSpinRotation(current, targetRotation, 5),
      );
      setIsSpinning(true);
      const spinDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 650
        : SPIN_DURATION_MS;

      spinTimer.current = window.setTimeout(() => {
        setIsSpinning(false);
        setIsLossResult(!result.won);
        setIsProductResult(result.prizeType === "product");
        setResultAmount(result.won ? result.amount : null);
        const currency = getCurrencyLabel(user?.country || "");
        const serverMessage = result.message?.replace(/\bFCFA\b/g, currency);
        setResultMessage(serverMessage ||
          (result.won
            ? result.prizeType === "product"
              ? `Vous avez gagné le produit « ${result.productName} » !`
              : `Vous avez gagné ${formatAmount(result.amount ?? 0)} ${currency} !`
            : "Désolé, vous n'avez rien gagné cette fois-ci."));
        void Promise.allSettled([
          queryClient.invalidateQueries({ queryKey: ["/api/fortune-wheel/status"] }),
          queryClient.invalidateQueries({ queryKey: ["/api/transactions"] }),
          refreshUser(),
        ]);
      }, spinDuration);
    },
    onError: (error: Error) => {
      const status = (error as Error & { status?: number }).status;
      if (status === 400) {
        clearSpinRequestId();
        setIsNoSpinsModalOpen(true);
        void statusQuery.refetch();
        return;
      }
      setErrorMessage(
        error.message || "Impossible de lancer la roue. Réessayez.",
      );
    },
  });

  if (!user) return null;

  const availableSpins = statusQuery.data?.availableSpins ?? 0;
  const visibleError =
    errorMessage ||
    (statusQuery.isError
      ? "Impossible de vérifier vos tours gratuits pour le moment."
      : null);

  return (
    <CheckinGameVisual
      labels={segments}
      currency={getCurrencyLabel(user?.country || "")}
      wheelRotationDegrees={wheelRotationDegrees}
      isSpinning={isSpinning}
      isClaiming={claimMutation.isPending || statusQuery.isLoading}
      availableSpins={availableSpins}
      resultAmount={resultAmount}
      isLossResult={isLossResult}
      isProductResult={isProductResult}
      resultMessage={resultMessage}
      isNoSpinsModalOpen={isNoSpinsModalOpen}
      errorMessage={visibleError}
      onDismissNoSpins={() => setIsNoSpinsModalOpen(false)}
      onDismissResult={() => {
        setResultAmount(null);
        setIsLossResult(false);
        setIsProductResult(false);
        setResultMessage(null);
      }}
      onPlay={() => {
        if (claimMutation.isPending || isSpinning || statusQuery.isLoading) return;
        if (statusQuery.isError) {
          setErrorMessage("Impossible de vérifier vos tours gratuits pour le moment.");
          return;
        }
        if (availableSpins < 1) {
          setIsNoSpinsModalOpen(true);
          return;
        }
        if (!spinRequestId.current) {
          const savedRequestId = spinRequestStorageKey
            ? readSpinRequestId(spinRequestStorageKey)
            : null;
          const requestId = savedRequestId && /^[0-9a-f-]{36}$/i.test(savedRequestId)
            ? savedRequestId
            : window.crypto.randomUUID();
          spinRequestId.current = requestId;
          if (spinRequestStorageKey) {
            storeSpinRequestId(spinRequestStorageKey, requestId);
          }
        }
        claimMutation.mutate(spinRequestId.current);
      }}
    />
  );
}
