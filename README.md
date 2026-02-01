# Queueing Simulator

A comprehensive web-based queueing simulator that implements various queueing theory models to analyze and optimize queueing systems. Built with React, Material UI, and Tailwind CSS, this application provides an intuitive interface for understanding queueing theory concepts and their practical applications.

## 🚀 Features

- **Multiple Queueing Models**:
  - M/M/1: Single server queue with Poisson arrivals and exponential service times
  - M/M/C: Multi-server queue with Poisson arrivals and exponential service times
  - M/G/C: Multi-server queue with Poisson arrivals and general service times
  - G/G/C: Multi-server queue with general arrival and service time distributions

- **Performance Metrics**:
  - Average Turnaround Time (TAT)
  - Average Waiting Time (WT)
  - Average Response Time (RST)
  - Server Utilization percentage

- **Visual Analytics**:
  - Interactive scatter plots and bar charts
  - Gantt charts for service scheduling visualization
  - Real-time performance metric displays

- **Advanced Scheduling**:
  - Priority-based queue management
  - Customizable arrival and service rates
  - Flexible parameter inputs

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS & Material UI
- **Routing**: React Router DOM
- **Charts**: @mui/x-charts
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd queuingsimulator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Page footer
│   └── ...
├── page/               # Main application pages
│   ├── Hero.jsx        # Landing page
│   ├── Home.jsx        # Home page
│   ├── Simulation/     # Queueing simulation components
│   │   ├── MM1.jsx     # M/M/1 model
│   │   ├── MMC.jsx     # M/M/C model
│   │   └── ...
│   └── Queueing/       # Queueing model UIs
├── utils/              # Mathematical algorithms and calculations
├── config/             # Configuration files
└── index.css           # Global styles
```

## 📊 Usage

1. Navigate to the desired queueing model (M/M/1, M/M/C, M/G/C, or G/G/C)
2. Input the required parameters:
   - Arrival rate (λ)
   - Service rate (μ)
   - Number of servers (c)
   - Priority settings (if applicable)
3. Click "Simulate" to calculate and visualize the results
4. Analyze the performance metrics and charts

## 🧮 Mathematical Models

The simulator implements fundamental queueing theory concepts including:
- Poisson distribution for arrival times
- Exponential distribution for service times
- Priority-based scheduling algorithms
- Performance metrics calculations
- Cumulative probability calculations

## 🎯 Applications

This simulator is useful for:
- **Educational purposes**: Understanding queueing theory concepts
- **Operations research**: Optimizing service systems
- **Business analysis**: Improving customer service efficiency
- **Research**: Testing queueing model variations
- **Industry applications**: Retail, healthcare, transportation, telecommunications

## 🔧 Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please create an issue in the repository.

## 👨‍💻 Author

Developed as part of a queueing theory project to demonstrate practical applications of queueing models and their impact on operational efficiency.
