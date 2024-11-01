// EventItem.js
const EventItem = ({ src, alt, title, dataValue }) => {
    return (
      <div className="item flex flex-col   bg-white rounded-xl lg:w-80 w-44 lg:h-96 h-48 shadow-xl hover:scale-105 justify-center " data-value={dataValue}>
        <img
          src={src}
          alt={alt}
          className="w-full h-80  object-cover rounded-t-xl"
        />
        {title && <h2 className="text-black lg:text-2xl font-semibold h-16 text-center">{title}</h2>}
      </div>
    );
  };
  
  export default EventItem;
  