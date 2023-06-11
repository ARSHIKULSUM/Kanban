import{
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue
} from 'recoil'

export const cardState = atom ({
  key:"card",
  default:{
      id:''
  }
})