interface RegisterStepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { label: "Basic Info", step: 1 },
  { label: "Profile Info", step: 2 },
  { label: "Contact", step: 3 },
];

export function RegisterStepIndicator({ currentStep }: RegisterStepIndicatorProps) {
  return (
    <div className="flex items-center mb-8 gap-1">
      {STEPS.map(({ label, step }, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-2 mb-1" style={{ minWidth: 0 }}>
              <div
                className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  background: currentStep >= step ? "#22c55e" : "#e2e8f0",
                  color: currentStep >= step ? "#fff" : "#94a3b8",
                  boxShadow:
                    currentStep === step ? "0 0 0 3px rgba(34,197,94,0.18)" : "none",
                }}
              >
                {currentStep > step ? (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M2.5 6.5L5.5 9.5L10.5 4"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className="text-xs font-medium hidden sm:block truncate"
                style={{
                  color: currentStep >= step ? "#22c55e" : "#94a3b8",
                  transition: "color 0.3s",
                }}
              >
                {label}
              </span>
            </div>
            <div
              className="w-full h-[2px] rounded-full transition-all duration-500"
              style={{
                background: currentStep >= step ? "#22c55e" : "#e2e8f0",
              }}
            />
          </div>
          {i < 2 && <div style={{ width: 12, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  );
}
