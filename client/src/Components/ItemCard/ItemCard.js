import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './ItemCard.scss'
import useOnclickOutside from 'react-cool-onclickoutside'

const ItemCard = ({item}) => {
  const {productId, demoUrl, yearLastUpdate, downloadUrl, productImage, description, categories, tags} = item;
  const [state, setState] = useState({
    itemModal: false,
  });
  console.log(description);
  
  const getTitle = (description) => {
    let common_txt = '<p><strong>Woocrack.com</strong> – <strong>';
    let rest_of_description = description.trim().replace(common_txt, '').trim();
    let title = description.substring(
        description.lastIndexOf('<h3>') + 4,
        description.lastIndexOf('</h3>') - 1,
    ).trim();
    
    if (title.trim() === '' || title === 'Features') {
      
      
      title = rest_of_description.substring(
          0,
          rest_of_description.indexOf('</strong>'),
      ).trim();
    }
    if (title === '<p><strong>Woocrack.com') {
      common_txt = '<p><strong>Woocrack.com</strong> – ';
      rest_of_description = description.trim().replace(common_txt, '').trim();
      title = rest_of_description.substring(
          0,
          rest_of_description.indexOf('is a'),
      ).trim();
    }
    return title.replace('Features', '');
  }
  return (
      <div className="item-card" style={{backgroundImage: `URL("${productImage}")`}}>
        
        {
          state.itemModal ? <Modal {...item} setState={setState}/> : null
        }
        
        <div className="item-card__title">
          <h5 dangerouslySetInnerHTML={{
            __html: getTitle(description),
          }}/>
        </div>
        <div className="item_card__content">
          Last Updated On: {yearLastUpdate}
          <a href={demoUrl} target="_blank">Check website demo</a>
          <a href={downloadUrl} download={true}>download</a>
          <button onClick={event => {
            setState({
              itemModal: true,
            })
          }}>Show more info
          </button>
        
        </div>
      
      </div>
  )
  
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    demoUrl: PropTypes.string.isRequired,
    yearLastUpdate: PropTypes.number.isRequired,
    downloadUrl: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    
  }).isRequired,
};

const Modal = ({description, setState}) => {
  const ref = useRef();
  useOnclickOutside(ref, () => {
    setState({
      itemModal: false,
    })
  });
  return (
      <div className="item-modal" ref={ref}>
        <div dangerouslySetInnerHTML={{__html: description}}/>
      </div>
  )
}
export default ItemCard;
