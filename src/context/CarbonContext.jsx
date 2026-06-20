/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const CarbonContext = createContext();

export const useCarbon = () => useContext(CarbonContext);

export const CarbonProvider = ({ children }) => {
  const [footprint, setFootprint] = useState(340);
  const [totalSaved, setTotalSaved] = useState(48);
  const [score, setScore] = useState(85);
  const [uploadedBills, setUploadedBills] = useState([]);

  const [monthlyData, setMonthlyData] = useState([
    { name: 'Jan', footprint: 420 },
    { name: 'Feb', footprint: 380 },
    { name: 'Mar', footprint: 340 },
    { name: 'Apr (Forecast)', forecast: 290 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: '🚗 Transportation', value: 52, color: '#00FF9D' },
    { name: '⚡ Electricity', value: 28, color: '#00E5FF' },
    { name: '🍔 Food', value: 12, color: '#059669' },
    { name: '🛍️ Shopping', value: 8, color: '#FFD166' },
  ]);

  const [roadmapSteps, setRoadmapSteps] = useState([
    {
      id: 1,
      title: 'Take the train twice this week',
      why: 'Trains are 4x more carbon-efficient than driving alone.',
      savings: 8,
      difficulty: 'Medium',
      time: 'Ongoing',
      impact: '12% reduction in transport footprint',
      status: 'Not Started'
    },
    {
      id: 2,
      title: 'Reduce AC usage by 1 hour/day',
      why: 'AC units consume massive amounts of grid electricity.',
      savings: 5,
      difficulty: 'Easy',
      time: 'Daily',
      impact: '5% reduction in home energy footprint',
      status: 'In Progress'
    }
  ]);

  const scanBill = (data) => {
    setUploadedBills(prev => [...prev, data]);
    setFootprint(prev => prev + data.emissions);
    // Update category
    setCategoryData(prev => prev.map(c => 
      c.name.includes(data.category) ? { ...c, value: c.value + 5 } : c
    ));
    // Update forecast
    setMonthlyData(prev => {
      const newData = [...prev];
      newData[newData.length - 1].forecast += data.emissions;
      return newData;
    });
  };

  const completeAction = (id) => {
    setRoadmapSteps(prev => prev.map(step => {
      if (step.id === id && step.status !== 'Completed') {
        setFootprint(f => f - step.savings);
        setTotalSaved(s => s + step.savings);
        setScore(s => Math.min(100, s + 5));
        setMonthlyData(mData => {
          const newData = [...mData];
          newData[newData.length - 1].forecast -= step.savings;
          return newData;
        });
        return { ...step, status: 'Completed' };
      }
      return step;
    }));
  };

  return (
    <CarbonContext.Provider value={{
      footprint,
      totalSaved,
      score,
      monthlyData,
      categoryData,
      roadmapSteps,
      uploadedBills,
      scanBill,
      completeAction
    }}>
      {children}
    </CarbonContext.Provider>
  );
};
