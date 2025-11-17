import { toast } from "sonner";

const SnackbarUtils = {
  success(msg, options = {}) {
    toast.success(msg, {
      description: options.description,
      duration: options.duration || 7000,
      ...options,
    });
  },
  error(msg, options = {}) {
    toast.error(msg, {
      description: options.description,
      duration: options.duration || 7000,
      ...options,
    });
  },
  info(msg, options = {}) {
    toast.info(msg, {
      description: options.description,
      duration: options.duration || 7000,
      ...options,
    });
  },
  warning(msg, options = {}) {
    toast.warning(msg, {
      description: options.description,
      duration: options.duration || 7000,
      ...options,
    });
  },
  toast(msg, options = {}) {
    toast(msg, {
      duration: options.duration || 7000,
      ...options,
    });
  },
};

export default SnackbarUtils;
