import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface/50",
        className
      )}
    />
  );
};

export const BlogPostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg p-4">
      <Skeleton className="aspect-video w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export const GalleryItemSkeleton: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-md">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-2/3 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export const TestimonialCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="ml-4">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};