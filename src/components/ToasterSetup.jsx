import { Toaster as SonnerToaster, toast } from "sonner";

// Function to display toast notifications
export const showToast = (message, type = "default") => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast(message);
  }
};

// Renaming your Toaster component to avoid conflicts with Sonner's Toaster
const ToasterSetup = () => {
  return (
    <SonnerToaster
      // toastOptions={{ style: { backgroundColor: "#fff5" } }}
      position="top-right"
      richColors
      // closeButton
    />
  );
};

export default ToasterSetup;
