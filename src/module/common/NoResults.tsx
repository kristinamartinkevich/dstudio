import { Button } from "@nextui-org/react";

import { RefreshIcon } from "@/assets/icons";

interface NoResultsProps {
  onButtonClick: () => void;
}

const NoResults = (props: NoResultsProps) => {
  const { onButtonClick } = props;

  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="p-8 text-center">
        <span className="text-2xl font-bold mb-4"> No tasks :(</span>
        <div className="flex items-center">
          <Button className="px-4 py-2 mx-2" onClick={onButtonClick}>
            <RefreshIcon />
            Try again
          </Button>
          <span className="mx-1">or create your first task</span>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
