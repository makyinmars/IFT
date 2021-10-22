import { useToast, Button } from "@chakra-ui/react";

type Status = "info" | "success" | "warning" | "error" | undefined;

interface Props {
  title: string;
  description: string;
  status: Status;
  children: React.ReactNode;
}

const ToastButton = ({ title, description, status, children }: Props) => {
  const toast = useToast();

  const onClickToast = () => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Button w="full" variant="primary" type="submit" onClick={onClickToast}>
      {children}
    </Button>
  );
};

export default ToastButton;
