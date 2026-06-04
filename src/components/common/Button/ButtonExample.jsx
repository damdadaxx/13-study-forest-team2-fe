import Button from '@/components/common/Button/Button';
import ButtonController from '@/components/common/Button/ButtonController';
import ButtonControllerCircle from '@/components/common/Button/ButtonControllerCircle';
import ButtonHabit from '@/components/common/Button/ButtonHabit';
import ButtonText from '@/components/common/Button/ButtonText';

// TODO: 1차 개발 완료 전에 삭제하기
export default function ButtonExample() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '50px',
      }}
    >
      <p
        style={{ fontSize: '50px', padding: '25px 0' }}
      >{`<Button> 컴포넌트`}</p>
      {/* 기본(brand) 컬러 */}
      <Button text="수정 완료" />

      {/* href 링크 */}
      <Button href="/example" text="수정하러 가기" />

      {/* disabled */}
      <Button disabled={true} text="만들기" />

      {/* size 속성 */}
      <Button size="sm" text="스터디 만들기" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
        }}
      >
        <Button text="확인" />
        <Button color="gray" text="취소" />
      </div>

      <p
        style={{ fontSize: '50px', padding: '25px 0' }}
      >{`<ButtonController> 컴포넌트`}</p>
      <ButtonController />
      <ButtonController variant="secondary" />
      <ButtonController disabled={true} />

      <p
        style={{ fontSize: '50px', padding: '25px 0' }}
      >{`<ButtonControllerCircle> 컴포넌트`}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '50px',
        }}
      >
        <ButtonControllerCircle />
        <ButtonControllerCircle color="gray" />
        <ButtonControllerCircle variant="secondary" color="green" />
        <ButtonControllerCircle variant="secondary" color="gray" />
      </div>

      <p
        style={{ fontSize: '50px', padding: '25px 0' }}
      >{`<ButtonHabit> 컴포넌트`}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '50px',
        }}
      >
        <ButtonHabit text="오늘의 습관" />
        <ButtonHabit text="오늘의 집중" />
        <ButtonHabit text="홈" href="/" />
      </div>

      <p
        style={{ fontSize: '50px', padding: '25px 0' }}
      >{`<ButtonText> 컴포넌트`}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '50px',
        }}
      >
        <ButtonText text="공유하기" />
        <ButtonText text="수정하기" />
        <ButtonText text="스터디 삭제하기" color="gray" />
      </div>
    </section>
  );
}
