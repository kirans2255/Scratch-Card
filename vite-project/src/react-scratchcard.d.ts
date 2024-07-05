declare module 'react-scratchcard' {
    import { Component } from 'react';
  
    interface ScratchCardProps {
      image: string;
      width: number;
      height: number;
      finishPercent: number;
      onComplete: () => void;
    }
  
    export default class ScratchCard extends Component<ScratchCardProps> {}
  }
  