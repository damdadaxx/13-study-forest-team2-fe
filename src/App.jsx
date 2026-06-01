import { Route, Routes } from 'react-router';

import MainLayout from '@/layouts/MainLayout/MainLayout';

import Example from '@/pages/Example';
import Focus from '@/pages/Focus';
import Habit from '@/pages/Habit';
import Main from '@/pages/Main';
import NotFound from '@/pages/NotFound';
import StudyCreate from '@/pages/studies/StudyCreate';
import StudyDetail from '@/pages/studies/StudyDetail';
import StudyEdit from '@/pages/studies/StudyEdit';

import ButtonExample from '@/components/common/Button/ButtonExample';
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
          </Route>

          <Route path="habits" element={<Habit />} />
          <Route path="focus" element={<Focus />} />
        </Route>

        {/* TODO: 개발 완료 시 삭제하기 */}
        <Route path="tags" element={<TagExample />} />
        <Route path="buttons" element={<ButtonExample />} />
        <Route path="inputs" element={<InputExample />} />
        <Route path="example" element={<Example />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
