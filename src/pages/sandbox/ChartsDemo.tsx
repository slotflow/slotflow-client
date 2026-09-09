import PieChartDemo from './chartDemo/PieChartDemo';
import AreaChartDemo from './chartDemo/AreaChartDemo';
import RadialChartDemo from './chartDemo/RadialChartDemo';
import BarChartHorizontalDemo from './chartDemo/BarChartDemo';
import BarChartStackedDemo from './chartDemo/BarChartStackedDemo';
import HorizontalChartDemo from './chartDemo/HorizontalChartDemo';
import ChartLineLinearDemo from './chartDemo/ChartLineLinearDemo';
import BarChartVerticalDemo from './chartDemo/BarChartVerticalDemo';
import ChartLineMultipleDemo from './chartDemo/ChartLineMutipleDemo';
import LineChartHorizontalDemo from './chartDemo/LineChartHorizontalDemo';

const ChartsDemo = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <AreaChartDemo />
      <BarChartHorizontalDemo />
      <BarChartStackedDemo />
      <BarChartVerticalDemo />
      <ChartLineLinearDemo />
      <ChartLineMultipleDemo />
      <HorizontalChartDemo />
      <LineChartHorizontalDemo />
      <PieChartDemo />
      <RadialChartDemo />
    </div>
  );
};

export default ChartsDemo;
