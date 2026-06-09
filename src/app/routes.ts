import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ChatPage } from "./pages/ChatPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { Spaces } from "./pages/Spaces";
import { Knowledge } from "./pages/Knowledge";
import { History } from "./pages/History";
import { Projects } from "./pages/Projects";
import { NotFound } from "./pages/NotFound";
import { DeveloperGuide } from "./pages/DeveloperGuide";
import { ClassicCoCounsel } from "./pages/ClassicCoCounsel";
import SkillTesting from "./pages/SkillTesting";
import { RegulatoryDemo } from "./pages/RegulatoryDemo";
import { StandaloneViewPage } from "./pages/StandaloneViewPage";
import { Preferences } from "./pages/Preferences";

export const router = createBrowserRouter([
  {
    path: "/classic",
    Component: ClassicCoCounsel,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "chat", Component: StandaloneViewPage },
      { path: "chat/:chatId", Component: ChatPage },
      { path: "workspace/:workspaceName", Component: WorkspacePage },
      { path: "spaces", Component: Spaces },
      { path: "knowledge", Component: Knowledge },
      { path: "preferences", Component: Preferences },
      { path: "knowledge/test-skill", Component: SkillTesting },
      { path: "regulatory-demo", Component: RegulatoryDemo },
      { path: "history", Component: History },
      { path: "projects", Component: Projects },
      { path: "developer-guide", Component: DeveloperGuide },
      { path: "api-testing", Component: DeveloperGuide },
      { path: "standalone-view/:viewId", Component: StandaloneViewPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
