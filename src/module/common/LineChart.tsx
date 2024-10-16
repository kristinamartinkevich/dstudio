import { useMemo } from "react";
import { LineChart } from "@mui/x-charts";
import { colorMap, OvertimeKey, selectedPropertiesMap } from "../../model/model";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { sortDataForCharts } from "@/utils/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface LineChartProps {
    xAxisData: Date[];
    seriesData: number[];
    selectedProperty: OvertimeKey;
}

function LineChartComponent(props: LineChartProps) {
    const { xAxisData, seriesData, selectedProperty } = props;

    const { sortedXAxisData, sortedSeriesData, totalSum } = useMemo(() => sortDataForCharts(xAxisData, seriesData), [xAxisData, seriesData]);
    return (
        <Card className="p-3 chart max-w-sm">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">Total:</p>
                    <p className="fw-bold text-default-500"><h1>{totalSum}</h1></p>
                </div>
            </CardHeader>
            <CardBody>
                <LineChart
                    xAxis={[
                        {
                            scaleType: "utc",
                            data: sortedXAxisData,
                            valueFormatter: (date) =>
                                date.toISOString().split('T')[0],
                            label: "Date",

                        },
                    ]}
                    series={[
                        {
                            data: sortedSeriesData,
                            color: colorMap[selectedProperty],
                            label: selectedPropertiesMap[selectedProperty as OvertimeKey],
                        },
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fill: 'gray',
                            },
                        },
                    }}
                    sx={{
                        [`.${axisClasses.root}`]: {
                            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                stroke: 'gray',
                            },
                            [`.${axisClasses.tickLabel}, .${axisClasses.label}`]: {
                                fill: 'gray',
                            },
                        },
                    }}
                    height={300}
                />      </CardBody>
        </Card>
    );
}

export default LineChartComponent;
