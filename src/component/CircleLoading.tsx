// components/WaveDotRing.tsx
"use client";

type Props = {
  size?: number; // 전체 지름(px)
  dotCount?: number; // 점 개수 (기본 8)
  minScale?: number; // 점 최소 스케일
  maxScale?: number; // 점 최대 스케일
  duration?: number; // 파동 한 바퀴 시간(초)
  clockwise?: boolean; // 파동 진행 방향
};

export default function CircleLoading({
  size = 64,
  dotCount = 8,
  minScale = 0.4,
  maxScale = 1.0,
  duration = 1.2,
  clockwise = true,
}: Props) {
  const radius = size * 0.38; // 궤도 반지름
  const dotSize = size * 0.18; // 점 지름
  const step = duration / dotCount;

  return (
    <div className="flex flex-col items-center justify-center">
        <div
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          {Array.from({ length: dotCount }).map((_, i) => {
            const angle = (360 / dotCount) * i;
            const delaySec = (clockwise ? -1 : 1) * step * i; // 위상 지연으로 파동 진행
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: 0,
                  height: 0,
                  transform: `rotate(${angle}deg) translate(${radius}px)`,
                  transformOrigin: "0 0",
                }}
              >
                <div
                  className="rounded-full will-change-transform bg-blue-400 dark:bg-yellow-500"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    transform: "translate(-50%, -50%)",
                    animation: `__dotPulse ${duration}s ease-in-out infinite`,
                    animationDelay: `${delaySec}s`,
                  }}
                />
              </div>
            );
          })}

          <style jsx>{`
            /* 각 점이 고정된 자리에서 펄스만 한다 */
            @keyframes __dotPulse {
              0% {
                transform: translate(-50%, -50%) scale(${minScale});
                opacity: 0.6;
              }
              35% {
                transform: translate(-50%, -50%) scale(${maxScale});
                opacity: 1;
              }
              65% {
                transform: translate(-50%, -50%) scale(${maxScale});
                opacity: 1;
              }
              100% {
                transform: translate(-50%, -50%) scale(${minScale});
                opacity: 0.6;
              }
            }
          `}</style>
        </div>
        <div className="mt-2 font-sourcecodepro"><p>Loading . . .</p></div>
    </div>
  );
}
