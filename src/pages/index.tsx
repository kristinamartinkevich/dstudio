import DefaultLayout from "@/layouts/default";
import Authentication from "@/module/authentication/Authentication";
import { useProjectStore } from "@/store";
import TaskPage from "./TaskPage";
import Loader from "@/module/common/Loader";

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
