export default function Profile(){
    return (
        <Aavtar
        person={{name:'Hu',imageID:'1bX5QH6'}}
        size={200}
        />
    );
}

function Aavtar({person,size}){
    return(
        <div>
            <figure>
                <img
                src='https://i.imgur.com/od37gW0.jpeg'
                alt="Hu"
                width={size}
                />
                <figcaption>
                name: {person.name} <br />
                imageID: {person.imageID} <br />
                </figcaption>
            </figure>
        </div>
    );
}