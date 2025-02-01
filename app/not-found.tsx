import H2 from './components/basic/H2';
import H3 from './components/basic/H3';
import H4 from './components/basic/H4';
import Hr from './components/basic/Hr';

export default function NotFound() {
  return (
    <div>
      <div className="mb-3">
        <H2>404, Not found</H2>
      </div>
      <Hr />
      <div>
        <div className="grid gap-y-5">
          <div className="mt-6 flex items-end gap-x-2">
            <H3>침묵</H3>
            <H4>유승도</H4>
          </div>
          <div>
            <p>골바람 속에 내가 있었다 바람이 어디서 불어오는지</p>
            <p>알려하지 않았으므로 어디로 가는지를 묻지도 않았다</p>
          </div>
          <div>
            <p>
              골짜기 외딴집 툇마루에 앉아 한 아낙이 부쳐주는 파전과 호박전을
              씹으며
            </p>
            <p>
              산등성이 너머에서 십년 묵언에 들어가 있다는 한 사람을 생각했으나
            </p>
            <p>왜 그래야 하는지에 대해서는 생각하고 싶지 않았다</p>
          </div>
          <p>바람 속에 내가 있었으므로 바람의 처음과 끝을 이야기하지 않았다</p>
        </div>
      </div>
    </div>
  );
}
