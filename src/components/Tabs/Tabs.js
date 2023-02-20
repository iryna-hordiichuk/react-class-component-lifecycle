import React, { PureComponent } from 'react';

export default class Tabs extends PureComponent {
    state = {
      activeTabIdx: 0,
    };
  
//    shouldComponentUpdate(nextProps, nextState){
//     return nextState.activeTabIdx !== this.state.activeTabIdx;
//    }

  
    setActiveTabIdx = idx => {
      this.setState({ activeTabIdx: idx });
    };
  
    render() {
      console.log(`Re-render @ ${Date.now()}`);
  
      const { activeTabIdx } = this.state;
      const { items } = this.props;
      const activeTab = items[activeTabIdx];
  
      return (
        <>
          <div>
            {items.map((item, idx) => (
              <button
                type="button"
                key={item.label}
                onClick={() => this.setActiveTabIdx(idx)}
              >
                {item.label}
              </button>
            ))}
          </div>
  
          <div>
            <h2>{activeTab.label}</h2>
            <p>{activeTab.content}</p>
          </div>
        </>
      );
    }
  }

  //! предовращаем лишний ререндер при одинаковом стейте
// (например когда юзер клацает еще раз на таб которій
// уже вібран (активній индекс уже записаній в стейт))
// исп. метод shouldComponentUpdate(nextProps, nextState)
// єтот метод візівается перед методом рендер
// заходят новіе пропсі или изм стейт, візівается 
// shouldComponentUpdate(),если он возвращает true,
// візівается метод рендер
// если возвращет false - єто означает что после текущего апдейта
// ререндер компонента не должен происходить
// значит - на текущем апдейте пропускается ререндер
// данного компонента
// єто метод для оптимизации
// но надо осторожно исп. так как стравнение обєкта по ссілке
//зачастую "дороже" чем ререндер разметки
//! альтернатива єтому методу - унаследовать клас от PureComponent
// тут под капотом уже реализован shouldComponentUpdate
// идет поверхностное (первая вложенность) сравнение всех пропсов