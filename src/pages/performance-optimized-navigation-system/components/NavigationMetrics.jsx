import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NavigationMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Render Time',
      value: `${metrics?.renderTime}ms`,
      description: 'Component initialization time',
      icon: 'Clock',
      color: metrics?.renderTime < 50 ? 'text-green-500' : metrics?.renderTime < 100 ? 'text-yellow-500' : 'text-red-500',
      bgColor: metrics?.renderTime < 50 ? 'bg-green-500/10' : metrics?.renderTime < 100 ? 'bg-yellow-500/10' : 'bg-red-500/10'
    },
    {
      title: 'Memory Usage',
      value: `${metrics?.memoryUsage}MB`,
      description: 'Current JavaScript heap size',
      icon: 'Database',
      color: metrics?.memoryUsage < 30 ? 'text-green-500' : metrics?.memoryUsage < 60 ? 'text-yellow-500' : 'text-red-500',
      bgColor: metrics?.memoryUsage < 30 ? 'bg-green-500/10' : metrics?.memoryUsage < 60 ? 'bg-yellow-500/10' : 'bg-red-500/10'
    },
    {
      title: 'Scroll Performance',
      value: `${Math.round(metrics?.scrollPerformance)}%`,
      description: 'Smooth scrolling efficiency',
      icon: 'Activity',
      color: metrics?.scrollPerformance > 80 ? 'text-green-500' : metrics?.scrollPerformance > 60 ? 'text-yellow-500' : 'text-red-500',
      bgColor: metrics?.scrollPerformance > 80 ? 'bg-green-500/10' : metrics?.scrollPerformance > 60 ? 'bg-yellow-500/10' : 'bg-red-500/10'
    }
  ];

  const performanceScore = Math.round(
    (metrics?.scrollPerformance + 
     (metrics?.renderTime < 50 ? 100 : metrics?.renderTime < 100 ? 70 : 40) + 
     (metrics?.memoryUsage < 30 ? 100 : metrics?.memoryUsage < 60 ? 70 : 40)) / 3
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-glass-text-primary mb-6">
          Performance Metrics
        </h2>
        <p className="text-lg text-glass-text-secondary max-w-3xl mx-auto">
          Real-time performance monitoring shows the effectiveness of our optimization techniques.
        </p>
      </div>
      {/* Overall Performance Score */}
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="glass-morphism rounded-3xl p-8 text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-glass-surface"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="54"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                className={performanceScore > 80 ? 'text-green-500' : performanceScore > 60 ? 'text-yellow-500' : 'text-red-500'}
                initial={{ strokeDasharray: "0 339.292" }}
                animate={{ strokeDasharray: `${(performanceScore / 100) * 339.292} 339.292` }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-glass-text-primary">
                {performanceScore}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-glass-text-primary mb-2">
            Performance Score
          </h3>
          <p className="text-glass-text-secondary text-sm">
            Overall system optimization rating
          </p>
        </motion.div>
      </div>
      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metricCards?.map((metric, index) => (
          <motion.div
            key={metric?.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${metric?.bgColor} rounded-xl flex items-center justify-center`}>
                <Icon name={metric?.icon} size={24} className={metric?.color} />
              </div>
              <div className={`px-3 py-1 ${metric?.bgColor} ${metric?.color} rounded-full text-sm font-semibold`}>
                {metric?.value}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-glass-text-primary mb-2">
              {metric?.title}
            </h3>
            <p className="text-glass-text-secondary text-sm">
              {metric?.description}
            </p>

            {/* Progress Bar */}
            <div className="mt-4 bg-glass-surface rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${metric?.color?.replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                whileInView={{ 
                  width: metric?.title === 'Render Time' ? 
                    `${Math.max(0, 100 - (metrics?.renderTime / 2))}%` :
                    metric?.title === 'Memory Usage' ?
                    `${Math.max(0, 100 - (metrics?.memoryUsage / 1.5))}%` :
                    `${metrics?.scrollPerformance}%`
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      {/* Optimization Tips */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold text-glass-text-primary mb-6 text-center">
          Optimization Techniques Used
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'Zap', title: 'Debounced Events', desc: 'Reduced event frequency' },
            { icon: 'Download', title: 'Lazy Loading', desc: 'Components on demand' },
            { icon: 'Cpu', title: 'GPU Acceleration', desc: 'Hardware optimization' },
            { icon: 'Database', title: 'Smart Caching', desc: 'Intelligent memory use' }
          ]?.map((tip, index) => (
            <motion.div
              key={tip?.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 glass-interactive rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon name={tip?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="font-semibold text-glass-text-primary mb-1">
                {tip?.title}
              </h4>
              <p className="text-glass-text-secondary text-sm">
                {tip?.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NavigationMetrics;