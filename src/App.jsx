import { Route, Routes } from 'react-router';

import MainLayout from '@/layouts/MainLayout/MainLayout';

import Focus from '@/pages/focus/Focus';
import Habit from '@/pages/habits/Habit';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import StudyCreate from '@/pages/studies/StudyCreate';
import StudyDetail from '@/pages/studies/StudyDetail';
import StudyEdit from '@/pages/studies/StudyEdit';

import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="studies">
            <Route path="new" element={<StudyCreate />} />
            <Route path=":studyId/edit" element={<StudyEdit />} />
            <Route path=":studyId" element={<StudyDetail />} />
            <Route path=":studyId/habits" element={<Habit />} />
            <Route path=":studyId/focus" element={<Focus />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
