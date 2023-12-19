export interface LineChartConfig {
	labels: string[];
	datasets: Array<{
		data: Array<{
            x: string,
            y: number
        }>;
	}>;
}