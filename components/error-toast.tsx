import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { memo, useEffect } from "react";

import { useToast } from "providers/toast";

const ErrorToast = memo(function ErrorToast() {
  const { toast, setToast, toastData } = useToast();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false, null);
      }, 1000 * 10);
    }
  }, [toast, setToast]);

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {toastData.title}
          </h3>
          <div className="mt-1 text-sm text-red-700">
            <p>{toastData.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ErrorToast;
