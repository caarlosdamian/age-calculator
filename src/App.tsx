import React from 'react';
import { Input } from './components/input/Input';
import { inputData } from './utils';

export const App = () => {
  return (
    <main className="bg-primary-lightGrey w-screen h-screen flex justify-center items-center">
      <div className="w-[343px] bg-white min-h-[486px] rounded-3xl rounded-br-[100px] py-12 px-6 gap-8">
        <div className="flex gap-4">
          {inputData.map((item) => (
            <Input
              label={item.id}
              placeholder={item.placeholder}
              maxLength={item.length}
            />
          ))}
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </main>
  );
};
