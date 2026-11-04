export default function ContentRibbon({items,label}:{items:readonly string[];label:string}){
 return <div className="content-ribbon" aria-label={label}><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></div>;
}
