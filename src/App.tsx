import { Input } from './components/input/Input';
import { inputData } from './utils';
import Arrow from './assets/images/icon-arrow.svg';

export const App = () => {
  return (
    <main className="bg-primary-lightGrey w-screen h-screen flex justify-center items-center">
      <div className="w-[343px] bg-white min-h-[486px] rounded-3xl rounded-br-[100px] py-12 px-6 flex flex-col gap-8 md:w-[728px] md:rounded-br-[200px] md:h-[680px] md:p-14">
        <div className="flex gap-4">
          {inputData.map((item) => (
            <Input
              key={item.id}
              label={item.id}
              placeholder={item.placeholder}
              maxLength={item.length}
              className='md:max-w-[160px]'
            />
          ))}
        </div>
        <div className="relative min-h-[64px] py-8 md:py-12">
          <div className="h-[1px] bg-primary-line w-full"></div>
          <div className="absolute top-0 left-[40%] w-16 h-16 bg-primary-purple rounded-[50%] flex items-center justify-center md:left-[90%] md:h-24 md:w-24">
            <img
              src={Arrow}
              alt="Arrow"
              className="italic w-6 h-6 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col">
          {inputData.map((item) => (
            <div className="flex items-center gap-2" key={item.placeholder}>
              <p className="font-bold text-[56px] leading-[110%] italic tracking-[-1.12px] md:text-[104px] text-primary-purple">
                {' '}
                - -{' '}
              </p>
              <strong className="font-bold text-[56px] leading-[110%] italic tracking-[-1.12px] md:text-[104px] text-primary-black">
                {item.id}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
