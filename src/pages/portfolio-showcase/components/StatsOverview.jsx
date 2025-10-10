import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          className="glass-morphism rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="w-12 h-12 glass-interactive rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
            <Icon name={stat?.icon} size={24} className="text-primary" />
          </div>
          
          <div className="text-2xl font-bold text-glass-text-primary mb-1">
            {stat?.value}
          </div>
          
          <div className="text-sm text-glass-text-secondary">
            {stat?.label}
          </div>
          
          {stat?.trend && (
            <div className={`flex items-center justify-center space-x-1 mt-2 text-xs ${
              stat?.trend > 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.trend > 0 ? "TrendingUp" : "TrendingDown"} 
                size={12} 
              />
              <span>{Math.abs(stat?.trend)}%</span>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsOverview;