import create from 'zustand';

interface SliderState {
  currentIndex: number;
  setCurrentIndex(index: number): void;
}

export const useSliderStore = create<SliderState>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index : number) => set( state => ({currentIndex : state.currentIndex=index})),
}));