import { useEffect, useState } from "react";
import './home.css';
import api from '../../services/api';
import {FaPlus, FaTrash} from 'react-icons/fa';
import { Link } from "react-router-dom";


export default function Home(){
    const [albuns, setAlbuns] = useState([]);
    const [newBusca, setNewBusca] = useState('');
    const [loading, setLoading] = useState(true);

  useEffect(()=>{

      async function loadAlbuns(){

        const response = await api.get('album');
        setAlbuns(response.data.data);
        setLoading(false);
      
      }

      loadAlbuns();

    }, [])

    /* lendo input */

    function handleinputChangeBusca(e){
      setNewBusca(e.target.value);
    }


    /* filtrando os nomes dos albuns */

      const lowerBusca = newBusca.toLowerCase();
      const albunsFiltros = albuns.filter((filtro)=>{
      return filtro.name.toLowerCase().includes(lowerBusca);
     })
   

     /* fazendo carregamento da página */

    if(loading){
       return(
         <div className="loading" >
           <h1>Carregando...</h1>
         </div>

       )
    }

    return(
        <>

            <section className="content_home">

              <h5>Digite uma palavra chave</h5>

              <div className="content_form">
                <form>
                    <input type="search" placeholder="Digite aqui..." value={newBusca} onChange={handleinputChangeBusca}/>
                    <input type="submit" name="acao" value="Procurar"/>
                </form>
              </div>

              <Link className="add_deletar" to="/musicas">add/deletar musicas</Link>

    
              {
                albunsFiltros.map((el)=>{

                return(
                <div className="musicas" key={el.id}>

                  <div className="albuns">
                    <h5>Álbuns: {el.name}, {el.year}</h5>
                  </div>{/*albuns */}

                  <div className="faixas_single">
                      <div className="number_faixa">
                        <h5>N°</h5>
                        <h5>Faixa</h5>
                      </div>{/*number_faixa */}

                      <div className="duracao">
                          <h5>Duração</h5>
                      </div>{/*duracao */}
                    </div>{/*faixas_single */}

                  {
                    el.tracks.map((ele)=>{
                      return(
                  
                  <div className="faixas" key={ele.id}>
                    <div className="faixas_single">
                      <div className="number_faixa">
                        
                        <h5>{ele.number}</h5>
                        <h5>{ele.title}</h5>
                      </div>{/*number_faixa */}

                      <div className="duracao">
                          <h5>{`${ele.duration} Seg.`}</h5>
                         
                      </div>{/*duracao */}
                    
                    </div>{/*faixa_single */}

                  </div>

                  )

                  })

                }

                </div>
                )
                
              })
                
            }

            </section>
        
        </>
    )
}