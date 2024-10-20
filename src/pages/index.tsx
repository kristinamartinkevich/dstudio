import DefaultLayout from "@/layouts/default";
import { useProjectStore } from "@/store";
import Loader from "@/module/common/Loader";
import Authentication from "./authentication/Authentication";
import TaskPage from "./tasks/TaskPage";

export default function IndexPage() {
  const { loggedIn, loading } = useProjectStore();

  return (
    <DefaultLayout>
      {loading ?
        <Loader /> :
        (!loggedIn ?
          (<Authentication />) :
          <TaskPage />
        )
      }
    </DefaultLayout>
  );
}
