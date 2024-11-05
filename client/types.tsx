export type ProgressBarProps = {
  status: boolean;
  monthlyKWh: number;
  onPercentageChange: (percentage: number) => void;
};

export type ApplianceSceneProps = {
  status: boolean;
  monthlyKWh: number;
  onPercentageChange: (percentage: number) => void;
};