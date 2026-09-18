export default function ContentRibbon({items,label}:{items:readonly string[];label:string}){
 return <div className="content-ribbon" aria-label={label} tabIndex={0}>
  <div className="content-ribbon-track">{[0,1].map(copy=><ul key={copy} aria-hidden={copy===1?true:undefined}>{items.map(item=><li key={item}>{item}</li>)}</ul>)}</div>
 </div>;
}
