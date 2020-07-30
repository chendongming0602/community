class Event{
  constructor(){
    
  }
  titleColor(text){
    let colorArr=[
      '#E465E3',
      '#EBA936',
      '#ffadb4',
      '#3E69C6',
      '#E44887',
      '#EB596B',
      '#219D82'
    ],es=Number(text),count=es%colorArr.length;
    return colorArr[count];
  }
};
let titleColor=new Event().titleColor;
export {
  titleColor
}