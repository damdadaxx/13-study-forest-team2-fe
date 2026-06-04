import { Route, Routes } from 'react-router';

import MainLayout from '@/layouts/MainLayout/MainLayout';

import Example from '@/pages/Example';
import Focus from '@/pages/focus/Focus';
import Habit from '@/pages/habits/Habit';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import StudyCreate from '@/pages/studies/StudyCreate';
import StudyDetail from '@/pages/studies/StudyDetail';
import StudyEdit from '@/pages/studies/StudyEdit';

import ButtonExample from '@/components/common/Button/ButtonExample';
import CardExample from '@/components/common/Card/CardExample.jsx';
import InputExample from '@/components/common/Input/InputExample';
import ModalExample from '@/components/common/Modal/ModalExample';
import TagExample from '@/components/common/Tag/TagExample.jsx';

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
        {/* TODO: 개발 완료 시 삭제하기 */}
        <Route path="buttons" element={<ButtonExample />} />
        <Route path="inputs" element={<InputExample />} />
        <Route path="modal" element={<ModalExample />} />
        <Route path="example" element={<Example />} />
        <Route path="cards" element={<CardExample />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
