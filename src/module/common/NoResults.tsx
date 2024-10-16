import { Button } from "@nextui-org/react";

interface NoResultsProps {
    onButtonClick: () => void;
}

const NoResults = (props: NoResultsProps) => {
    const { onButtonClick } = props;

    return (
        <div className="h-full flex items-center justify-center w-full">
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4"> No results :(</h1>
                <Button className="px-4 py-2"
                    onClick={onButtonClick}>Try again</Button>
            </div>
        </div>
    );
}

export default NoResults;