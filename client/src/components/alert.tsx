import { Alert as AlertChakra, AlertIcon, Center } from "@chakra-ui/react";

type Status = "success" | "error" | "info" | "warning" | undefined;

interface Props {
  status: Status;
  description: string;
}

const Alert = ({ status, description }: Props) => {
  return (
    <Center>
      <AlertChakra status={status}>
        <AlertIcon />
        {description}
      </AlertChakra>
    </Center>
  );
};

export default Alert;
