import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Pie, PieChart, Legend } from 'recharts';
import { 
  TrendingUp, Flame, Coins, ChevronLeft, Percent, 
  PiggyBank, Landmark, Repeat, BarChart3, CreditCard, 
  Calculator, IndianRupee 
} from 'lucide-react';

type CalculatorType = 'LIST' | 'SIP' | 'SWP' | 'FIRE' | 'EMI' | 'SBI_SIP' | 'PPF' | 'FD' | 'RD' | 'CC_EMI' | 'SI' | 'CAGR';

const FinancialCalculators: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<CalculatorType>('LIST');

  // Common UI Components
  const BackButton = () => (
    <button 
      onClick={() => setActiveCalc('LIST')}
      className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-6 transition-colors font-medium"
    >
      <ChevronLeft size={20} /> Back to Tools
    </button>
  );

  const SliderInput = ({ label, value, onChange, min, max, step, suffix = '' }: any) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
        <span className="text-sm font-bold text-emerald-600">{suffix === '₹' ? '₹' + value.toLocaleString() : value + suffix}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
      />
    </div>
  );

  const ResultCard = ({ label, value, subLabel, subValue }: any) => (
    <div className="bg-slate-50 p-4 rounded-xl mb-6 flex justify-between items-center border border-slate-100">
      <div>
        <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </div>
      {subLabel && (
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1 font-medium">{subLabel}</p>
          <p className="text-sm font-semibold text-slate-600">{subValue}</p>
        </div>
      )}
    </div>
  );

  // --- Calculator Implementations ---

  const SIPCalculator = ({ title = "SIP Calculator" }: { title?: string }) => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [stepUp, setStepUp] = useState(0);

    const data = useMemo(() => {
      const chartData = [];
      let invested = 0;
      let value = 0;
      let currentMonthly = monthlyInvestment;
      const monthlyRate = rate / 12 / 100;

      for (let i = 1; i <= years; i++) {
        // Calculate for 12 months
        for(let m=0; m<12; m++) {
          invested += currentMonthly;
          value = (value + currentMonthly) * (1 + monthlyRate);
        }
        // Step up at the end of year
        if (stepUp > 0) {
          currentMonthly = currentMonthly * (1 + stepUp / 100);
        }
        
        chartData.push({
          year: `Yr ${i}`,
          invested: Math.round(invested),
          value: Math.round(value)
        });
      }
      return chartData;
    }, [monthlyInvestment, rate, years, stepUp]);

    const totalValue = data[data.length - 1].value;
    const totalInvested = data[data.length - 1].invested;

    return (
      <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" /> {title}
        </h2>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <SliderInput label="Monthly Investment" value={monthlyInvestment} onChange={setMonthlyInvestment} min={500} max={100000} step={500} suffix="₹" />
          <SliderInput label="Expected Return (p.a)" value={rate} onChange={setRate} min={5} max={30} step={0.5} suffix="%" />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" Years" />
          <SliderInput label="Annual Step-up" value={stepUp} onChange={setStepUp} min={0} max={20} step={1} suffix="%" />

          <ResultCard 
            label="Maturity Value" 
            value={`₹${totalValue.toLocaleString()}`} 
            subLabel="Invested Amount" 
            subValue={`₹${totalInvested.toLocaleString()}`} 
          />

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip formatter={(val: number) => `₹${val.toLocaleString()}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}/>
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                <Area type="monotone" dataKey="invested" stroke="#94a3b8" fillOpacity={0} strokeDasharray="5 5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const SWPCalculator = () => {
    const [investment, setInvestment] = useState(1000000);
    const [withdrawal, setWithdrawal] = useState(5000);
    const [rate, setRate] = useState(8);
    const [years, setYears] = useState(10);
    const [stepUp, setStepUp] = useState(0);

    const data = useMemo(() => {
        const chartData = [];
        let balance = investment;
        let currentWithdrawal = withdrawal;
        const monthlyRate = rate / 12 / 100;
        let totalWithdrawn = 0;

        chartData.push({ year: 'Start', balance: Math.round(balance) });

        for (let i = 1; i <= years; i++) {
            for(let m=0; m<12; m++) {
                if (balance > 0) {
                    balance = (balance - currentWithdrawal) * (1 + monthlyRate);
                    totalWithdrawn += currentWithdrawal;
                    if(balance < 0) balance = 0;
                }
            }
             if (stepUp > 0) {
                currentWithdrawal = currentWithdrawal * (1 + stepUp / 100);
            }
            chartData.push({ year: `Yr ${i}`, balance: Math.round(balance) });
        }
        return { chartData, totalWithdrawn };
    }, [investment, withdrawal, rate, years, stepUp]);

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Coins className="text-blue-500" /> SWP Calculator</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <SliderInput label="Total Investment" value={investment} onChange={setInvestment} min={100000} max={10000000} step={50000} suffix="₹" />
            <SliderInput label="Monthly Withdrawal" value={withdrawal} onChange={setWithdrawal} min={1000} max={100000} step={500} suffix="₹" />
            <SliderInput label="Expected Return" value={rate} onChange={setRate} min={4} max={20} step={0.5} suffix="%" />
            <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" Years" />
            <SliderInput label="Withdrawal Step-up" value={stepUp} onChange={setStepUp} min={0} max={10} step={1} suffix="%" />

            <ResultCard 
                label="Final Balance" 
                value={`₹${data.chartData[data.chartData.length-1].balance.toLocaleString()}`} 
                subLabel="Total Withdrawn" 
                subValue={`₹${data.totalWithdrawn.toLocaleString()}`} 
            />

             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData}>
                    <defs>
                        <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(val: number) => `₹${val.toLocaleString()}`} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}/>
                    <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBal)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
  }

  const FIREPlanner = () => {
    const [expense, setExpense] = useState(50000);
    const [withdrawalRate, setWithdrawalRate] = useState(4);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(50);
    
    // Simple FIRE: Annual Expense * (100 / Withdrawal Rate)
    // Adjusted for inflation if we wanted to be complex, but standard FIRE calc usually targets today's value
    const annualExpense = expense * 12;
    const fireNumber = Math.round(annualExpense * (100 / withdrawalRate));

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Flame className="text-orange-500" /> FIRE Planner</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white mb-6">
                <h3 className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wider">Required Corpus</h3>
                <div className="text-3xl font-bold tracking-tight">₹{fireNumber.toLocaleString()}</div>
                <p className="text-xs mt-3 opacity-80 leading-relaxed">
                    To maintain a monthly lifestyle of ₹{expense.toLocaleString()} indefinitely.
                </p>
            </div>

            <SliderInput label="Monthly Expenses" value={expense} onChange={setExpense} min={10000} max={500000} step={5000} suffix="₹" />
            <SliderInput label="Safe Withdrawal Rate" value={withdrawalRate} onChange={setWithdrawalRate} min={2} max={6} step={0.1} suffix="%" />
            <SliderInput label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={60} step={1} suffix=" Yrs" />
            <SliderInput label="Retire By Age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={80} step={1} suffix=" Yrs" />
        </div>
        </div>
    );
  }

  const EMICalculator = ({ title = "EMI Calculator", isCreditCard = false }) => {
    const [amount, setAmount] = useState(isCreditCard ? 50000 : 1000000);
    const [rate, setRate] = useState(isCreditCard ? 36 : 9);
    const [tenure, setTenure] = useState(isCreditCard ? 12 : 60); // Months for CC, Months for Personal usually but typical EMI calcs use Years for Home. Let's stick to months for generic flexibility or handle logic.
    // Let's standardise: UI shows Years for Loan, Months for CC? 
    // To keep it simple: Tenure in Months always for calculation, UI slider can adapt.
    // Let's do Years for Loan, Months for CC.
    
    const [tenureUnit, setTenureUnit] = useState(isCreditCard ? 'Months' : 'Years');

    const months = tenureUnit === 'Years' ? tenure * 12 : tenure;
    const r = rate / 12 / 100;
    
    const emi = Math.round(amount * r * (Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)));
    const totalAmount = emi * months;
    const totalInterest = totalAmount - amount;

    const pieData = [
        { name: 'Principal', value: amount },
        { name: 'Interest', value: totalInterest }
    ];
    const COLORS = ['#10b981', '#f59e0b'];

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            {isCreditCard ? <CreditCard className="text-rose-500" /> : <Percent className="text-indigo-500" />} {title}
        </h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <SliderInput 
                label="Loan Amount" 
                value={amount} 
                onChange={setAmount} 
                min={isCreditCard ? 5000 : 100000} 
                max={isCreditCard ? 1000000 : 10000000} 
                step={isCreditCard ? 1000 : 50000} 
                suffix="₹" 
            />
            <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={1} max={isCreditCard ? 45 : 20} step={0.1} suffix="%" />
            <div className="mb-4">
                 <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tenure ({tenureUnit})</label>
                    <span className="text-sm font-bold text-emerald-600">{tenure} {tenureUnit}</span>
                 </div>
                 <input 
                    type="range" 
                    min={1} 
                    max={isCreditCard ? 48 : 30} 
                    step={1} 
                    value={tenure} 
                    onChange={(e) => setTenure(Number(e.target.value))} 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                 />
                 {!isCreditCard && (
                     <div className="flex gap-2 mt-2 justify-end">
                         <button onClick={() => {setTenureUnit('Years'); setTenure(5)}} className={`text-xs px-2 py-1 rounded ${tenureUnit === 'Years' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100'}`}>Years</button>
                         <button onClick={() => {setTenureUnit('Months'); setTenure(60)}} className={`text-xs px-2 py-1 rounded ${tenureUnit === 'Months' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100'}`}>Months</button>
                     </div>
                 )}
            </div>

            <ResultCard label="Monthly EMI" value={`₹${emi.toLocaleString()}`} subLabel="Total Interest" subValue={`₹${totalInterest.toLocaleString()}`} />

            <div className="h-48 w-full flex justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip formatter={(val: number) => `₹${val.toLocaleString()}`}/>
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
  }

  const PPFCalculator = () => {
    // PPF Rules: Max 1.5L/yr, 15 Years, Fixed rate ~7.1
    const [annualInv, setAnnualInv] = useState(150000);
    const [currentRate, setCurrentRate] = useState(7.1);

    const data = useMemo(() => {
        const chartData = [];
        let balance = 0;
        let invested = 0;
        for(let i=1; i<=15; i++) {
            invested += annualInv;
            balance = (balance + annualInv) * (1 + currentRate/100);
            chartData.push({ year: i, balance: Math.round(balance), invested });
        }
        return chartData;
    }, [annualInv, currentRate]);

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><PiggyBank className="text-pink-500" /> PPF Calculator</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SliderInput label="Yearly Investment" value={annualInv} onChange={setAnnualInv} min={500} max={150000} step={500} suffix="₹" />
             <SliderInput label="Interest Rate" value={currentRate} onChange={setCurrentRate} min={6} max={9} step={0.1} suffix="%" />
             
             <ResultCard 
                label="Maturity Value (15 Yrs)" 
                value={`₹${data[14].balance.toLocaleString()}`} 
                subLabel="Total Invested" 
                subValue={`₹${data[14].invested.toLocaleString()}`} 
             />
             
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 mb-4">
                 Note: PPF has a lock-in period of 15 years.
             </div>
        </div>
        </div>
    );
  }

  const FDCalculator = () => {
      const [investment, setInvestment] = useState(100000);
      const [rate, setRate] = useState(6.5);
      const [years, setYears] = useState(5);
      
      const maturityAmount = Math.round(investment * Math.pow((1 + rate/100), years));
      const interest = maturityAmount - investment;

      return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Landmark className="text-yellow-600" /> FD Calculator</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SliderInput label="Investment Amount" value={investment} onChange={setInvestment} min={5000} max={10000000} step={5000} suffix="₹" />
             <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={3} max={12} step={0.1} suffix="%" />
             <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={20} step={1} suffix=" Years" />
             
             <ResultCard 
                label="Maturity Value" 
                value={`₹${maturityAmount.toLocaleString()}`} 
                subLabel="Total Interest" 
                subValue={`₹${interest.toLocaleString()}`} 
             />
        </div>
        </div>
      );
  }
  
  const RDCalculator = () => {
      const [monthlyInv, setMonthlyInv] = useState(5000);
      const [rate, setRate] = useState(6.5);
      const [years, setYears] = useState(5);

      // RD Formula with quarterly compounding frequency which is standard in India
      // A = P * ( (1+R/400)^(4n) - 1 ) / (1-(1+R/400)^(-1/3)) - Formula is complex. 
      // Approximation using Monthly Loop for UI simplicity
      let val = 0;
      const months = years * 12;
      const monthlyRate = rate / 12 / 100; // Monthly approximation
      let invested = 0;
      for(let i=0; i<months; i++) {
          val = (val + monthlyInv) * (1 + monthlyRate);
          invested += monthlyInv;
      }
      const maturity = Math.round(val);
      const interest = maturity - invested;

       return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Repeat className="text-cyan-600" /> RD Calculator</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SliderInput label="Monthly Deposit" value={monthlyInv} onChange={setMonthlyInv} min={500} max={100000} step={500} suffix="₹" />
             <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={3} max={12} step={0.1} suffix="%" />
             <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={10} step={1} suffix=" Years" />
             
             <ResultCard 
                label="Maturity Value" 
                value={`₹${maturity.toLocaleString()}`} 
                subLabel="Total Interest" 
                subValue={`₹${interest.toLocaleString()}`} 
             />
        </div>
        </div>
      );
  }

  const SimpleInterestCalc = () => {
    const [principal, setPrincipal] = useState(50000);
    const [rate, setRate] = useState(10);
    const [years, setYears] = useState(2);

    const interest = Math.round((principal * rate * years) / 100);
    const total = principal + interest;

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Calculator className="text-slate-600" /> Simple Interest</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SliderInput label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={1000000} step={1000} suffix="₹" />
             <SliderInput label="Rate of Interest (p.a)" value={rate} onChange={setRate} min={1} max={50} step={0.5} suffix="%" />
             <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix=" Years" />
             
             <ResultCard 
                label="Total Amount" 
                value={`₹${total.toLocaleString()}`} 
                subLabel="Total Interest" 
                subValue={`₹${interest.toLocaleString()}`} 
             />
        </div>
        </div>
      );
  }

  const CAGRCalc = () => {
    const [startVal, setStartVal] = useState(10000);
    const [endVal, setEndVal] = useState(20000);
    const [years, setYears] = useState(5);

    let cagr = 0;
    if (startVal > 0 && years > 0) {
        cagr = (Math.pow(endVal / startVal, 1 / years) - 1) * 100;
    }

    return (
        <div className="animate-fade-in">
        <BackButton />
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2"><BarChart3 className="text-violet-600" /> CAGR Calculator</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SliderInput label="Initial Value" value={startVal} onChange={setStartVal} min={1000} max={10000000} step={1000} suffix="₹" />
             <SliderInput label="Final Value" value={endVal} onChange={setEndVal} min={1000} max={10000000} step={1000} suffix="₹" />
             <SliderInput label="Duration" value={years} onChange={setYears} min={1} max={50} step={1} suffix=" Years" />
             
             <div className="bg-slate-50 p-6 rounded-xl text-center border border-slate-100 mt-6">
                 <p className="text-sm text-slate-500 uppercase font-bold tracking-wide mb-2">CAGR Percentage</p>
                 <p className="text-4xl font-bold text-emerald-600">{cagr.toFixed(2)}%</p>
             </div>
        </div>
        </div>
      );
  }

  // --- Main Render Logic ---

  if (activeCalc === 'LIST') {
    return (
        <div className="space-y-6 pb-24">
            <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800">Financial Tools</h2>
                <p className="text-slate-500">Plan your finances with precision</p>
            </header>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { id: 'SIP', label: 'SIP', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { id: 'SBI_SIP', label: 'SBI SIP', icon: Landmark, color: 'text-blue-700', bg: 'bg-blue-50' },
                    { id: 'SWP', label: 'SWP', icon: Coins, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { id: 'FIRE', label: 'FIRE Planner', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { id: 'EMI', label: 'Loan EMI', icon: Percent, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { id: 'PPF', label: 'PPF', icon: PiggyBank, color: 'text-pink-600', bg: 'bg-pink-50' },
                    { id: 'FD', label: 'Fixed Deposit', icon: Landmark, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { id: 'RD', label: 'Rec. Deposit', icon: Repeat, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { id: 'CC_EMI', label: 'Credit Card EMI', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { id: 'SI', label: 'Simple Interest', icon: Calculator, color: 'text-slate-600', bg: 'bg-slate-100' },
                    { id: 'CAGR', label: 'CAGR', icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
                ].map((tool) => (
                    <button 
                        key={tool.id}
                        onClick={() => setActiveCalc(tool.id as CalculatorType)}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 h-32 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                            <tool.icon size={24} />
                        </div>
                        <span className="font-semibold text-slate-700 text-sm">{tool.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
  }

  // Render Active Calculator
  switch (activeCalc) {
      case 'SIP': return <SIPCalculator />;
      case 'SBI_SIP': return <SIPCalculator title="SBI SIP Calculator" />;
      case 'SWP': return <SWPCalculator />;
      case 'FIRE': return <FIREPlanner />;
      case 'EMI': return <EMICalculator />;
      case 'CC_EMI': return <EMICalculator title="Credit Card EMI" isCreditCard={true} />;
      case 'PPF': return <PPFCalculator />;
      case 'FD': return <FDCalculator />;
      case 'RD': return <RDCalculator />;
      case 'SI': return <SimpleInterestCalc />;
      case 'CAGR': return <CAGRCalc />;
      default: return null;
  }
};

export default FinancialCalculators;