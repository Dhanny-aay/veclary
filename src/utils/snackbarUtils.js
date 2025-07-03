import { toast } from "sonner";

const SnackbarUtils = {
  success(msg, options = {}) {
    toast.success(msg, {
      description: options.description,
      ...options,
    });
  },
  error(msg, options = {}) {
    toast.error(msg, {
      description: options.description,
      ...options,
    });
  },
  info(msg, options = {}) {
    toast.info(msg, {
      description: options.description,
      ...options,
    });
  },
  warning(msg, options = {}) {
    toast.warning(msg, {
      description: options.description,
      ...options,
    });
  },
  toast(msg, options = {}) {
    toast(msg, options);
  },
};

export default SnackbarUtils;
