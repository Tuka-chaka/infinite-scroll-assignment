import { observer } from "mobx-react-lite";
import { Spin } from "antd";
import EntryCard from "../entryCard/EntryCard";
import entries from "../../store/entries";
import { useEffect, useRef } from "react";

const EntryList = observer(() => {

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
    observer.current = new IntersectionObserver((observerEntries) => {
      observerEntries.forEach((entry) => {
        if (entry.isIntersecting && !entries.isFetching) {
          entries.fetchEntries()
        }
      })
    }, options)
    if (observer.current) {
      observer.current.observe(document.getElementById("sentinel")!);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {entries.entries.map(entry => <EntryCard key={entry.id} entry={entry}/>)}
      <div id="sentinel" style={{ height: "10px" }}></div>
      {entries.isFetching && <Spin/>}
    </>
  );
});
  
  export default EntryList;
  