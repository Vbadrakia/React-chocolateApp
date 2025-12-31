import React from 'react';
import './Skeleton.css';

export const SkeletonProductCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image" />
    <div className="skeleton-body">
      <div className="skeleton-title" />
      <div className="skeleton-price" />
      <div className="skeleton-text" />
      <div className="skeleton-text" style={{ width: '70%' }} />
      <div className="skeleton-buttons">
        <div className="skeleton-btn" />
        <div className="skeleton-btn" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="products-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonProductCard key={i} />
    ))}
  </div>
);
