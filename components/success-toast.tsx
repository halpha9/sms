import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useToast } from 'providers/toast';

const SuccessToast = memo(function SuccessToast() {
  const { toast, setToast, toastData } = useToast();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false, null);
      }, 1000 * 10);
    }
  }, [toast, setToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="rounded-md bg-slate-700 p-4"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-slate-400">{toastData.title}</h3>
          <div className="mt-1 text-sm text-slate-300">
            <p>{toastData.message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default SuccessToast;
