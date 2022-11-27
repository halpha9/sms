import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { memo, useEffect } from "react";

import { useToast } from "providers/toast";

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
    <div className="rounded-md bg-slate-700 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-slate-400">
            {toastData.title}
          </h3>
          <div className="mt-1 text-sm text-slate-300">
            <p>{toastData.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SuccessToast;
