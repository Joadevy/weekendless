import { ReactNode } from "react";

import { Dialog, InterceptedDialogContent } from "../ui/dialog";

type Props = {
  children?: ReactNode;
};

export default function InterceptedPageAsModal({ children }: Props) {
  return (
    <Dialog open>
      <InterceptedDialogContent>{children}</InterceptedDialogContent>
    </Dialog>
  );
}
