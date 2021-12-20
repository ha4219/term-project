import React from 'react';
import './App.css';
import { Button, Input, AutoComplete, Card, Grid, Col, Row, Divider, Progress, Text } from 'antd';

import APIHelper from './helpers/APIHelper';
import Logo from './components/Logo';
import img0 from './assets/main0.jpeg';
import img1 from './assets/main1.jpeg';
import img2 from './assets/main2.jpeg';

import {integerCut, featureCut} from './helpers/CutHelper';

function App() {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [candidate, setCandidate] = React.useState([]);
  const [before, setBefore] = React.useState([]);
  const [beforeData, setBeforeData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [predictData, setPredictData] = React.useState([]);

  const NEED = [
    {name: '탄수화물(g)', value: 324, label: 'carbohydrate', d: 'g'},
    {name: '당류(g)', value: 100, label: 'sugars', d: 'g'},
    {name: '단백질(g)', value: 55, label: 'protein', d: 'g'},
    {name: '지방(g)', value: 54, label: 'province', d: 'g'},
    {name: '포화지방(g)', value: 15, label: 'saturated_fatty_acids', d: 'g'},
    {name: '콜레스테롤(mg)', value: 300, label: 'cholesterol', d: 'g'},
    {name: '나트륨(mg)', value: 2000, label: 'salt', d: 'mg'},
  ];

  React.useEffect(async () => {
    await APIHelper.get('foodNames/', {
    }).then(res => {
      setData(res.data);
      setLoading(false);
    });
    setStatus(NEED);
  }, []);

  // React.useEffect(() => {
  //   let arr = [];
  //   status.map(item => {
  //     const tmp = beforeData.filter(element => element )
  //   })
  // }, [beforeData]);

  const NeedNutrient = ({item}) => {
    return (
      <Card title={item.name}>{item.value}</Card>
    );
  }

  const ShowTable = () => NEED.map((item, index) => (
    // <Row>
      <Col>
        <NeedNutrient className="card" item={item} />
      </Col>
    // </Row>
  ));

  const handleSearch = (inputValue) => {
    let res = [];

    if (!inputValue) {
      res = [];
    } else {
      res = data.filter(item => true === matchName(item.name, inputValue));
    }
    if (res.length > 0) {
      setCandidate(res);
    }
  };

  const matchName = (name, keyword) => {
    if(name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const onCancle = (index) => {
    setBeforeData([]);
    setStatus(NEED);
  }

  const onPush = async () => {
    setBefore([...before, search]);
    const tmp = await APIHelper.get(`foods/${search}/`);
    let arr = [];
    status.map((item) => {
      let temp = {...item, value: item.value - tmp.data[item.label] >= 0 ? item.value - tmp.data[item.label] : 0}
      arr.push(temp);
    })
    setStatus(arr);
    setBeforeData([...beforeData, tmp.data]);
  }

  const onPredict = async () => {
    const res = await APIHelper.post('predict/', {
      carbohydrate: status[0].value,
      sugars: status[1].value,
      protein: status[2].value,
      province: status[3].value,
      saturated_fatty_acids: status[4].value,
      cholesterol: status[5].value,
      salt: status[6].value
    });
    const arr = res.data;
    const tmp = [];
    arr.map(item => {
      const val = (item.carbohydrate - status[0].value) ** 2 +
                  (item.sugars - status[1].value) ** 2 +
                  (item.protein - status[2].value) ** 2 +
                  (item.province - status[3].value) ** 2 +
                  (item.saturated_fatty_acids - status[4].value) ** 2 +
                  (item.cholesterol - status[5].value) ** 2 +
                  (item.salt - status[6].value) ** 2
      tmp.push({...item, sortedValue: val});
    });
    await tmp.sort((a, b) => {
      return a.sortedValue - b.sortedValue;
    })
    setPredictData(tmp.slice(0, 5));
  }

  const StatusShow1 = () => {
    return (
      <Row gutter={[3, 3]} justify="center">
        {status.map((item, index) => (
          <Col span={3}>
            <Card className="status" title={item.name}>
              <div className="statusHead">
                {(NEED[index].value - item.value).toFixed(3)} / {NEED[index].value} {NEED[index].d}
              </div>
              <Progress
                type="circle"
                format={(percent) => (<b>{percent.toFixed(2)}%</b>)}
                percent={(NEED[index].value - item.value) / NEED[index].value * 100}
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  const FoodCard = (item) => {
    return (
      <Card className="food">
        <div className="statusHead">
          {`${item.item.name} (${integerCut(item.item.serving)}g)`}
        </div>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="carbohydrateName">
              <div className="carbohydrateLabel"><b className="carbohydrateLabelTxt">탄수화물</b></div>
              <b className="carbohydrateValue">{Number(item.item.carbohydrate).toFixed(3)}g</b> 
              <Progress 
                className="carbohydrate" 
                type="line" 
                percent={item.item.carbohydrate / NEED[0].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="sugarsName">
              <div className="sugarsLabel"><b className="sugarsLabelTxt">당류</b></div>
              <b className="sugarsValue">{Number(item.item.sugars).toFixed(3)}g</b> 
              <Progress 
                className="sugars" 
                type="line" 
                percent={item.item.sugars / NEED[1].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="proteinName">
              <div className="proteinLabel"><b className="proteinLabelTxt">단백질</b></div>
              <b className="proteinValue">{Number(item.item.protein).toFixed(3)}g</b> 
              <Progress 
                className="protein" 
                type="line" 
                percent={item.item.protein / NEED[2].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="provinceName">
              <div className="provinceLabel"><b className="provinceLabelTxt">지방</b></div>
              <b className="provinceValue">{Number(item.item.province).toFixed(3)}g</b> 
              <Progress 
                className="province" 
                type="line" 
                percent={item.item.province / NEED[3].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="saturated_fatty_acidsName">
              <div className="saturated_fatty_acidsLabel"><b className="saturated_fatty_acidsLabelTxt">포화지방</b></div>
              <b className="saturated_fatty_acidsValue">{Number(item.item.saturated_fatty_acids).toFixed(3)}g</b> 
              <Progress 
                className="saturated_fatty_acids" 
                type="line" 
                percent={item.item.saturated_fatty_acids / NEED[4].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="cholesterolName">
              <div className="cholesterolLabel"><b className="cholesterolLabelTxt">콜레스테롤</b></div>
              <b className="cholesterolValue">{Number(item.item.cholesterol).toFixed(3)}g</b> 
              <Progress 
                className="cholesterol" 
                type="line" 
                percent={item.item.cholesterol / NEED[5].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
          <div className="saltName">
            <div className="saltLabel"><b className="saltLabelTxt">나트륨</b></div>
            <b className="saltValue">{Number(item.item.salt).toFixed(3)}mg</b> 
            <Progress 
              className="salt" 
              type="line" 
              percent={item.item.salt / NEED[6].value * 100}
              format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
            />
          </div>
      </Card>
    );
  }

  const PredictCard = (item) => {
    console.warn(item);
    return (
      <Card className="food">
        <div className="statusHead">
          {`${item.item.name} (${integerCut(item.item.serving)}g)`}
        </div>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="carbohydrateName">
              <div className="carbohydrateLabel"><b className="carbohydrateLabelTxt">탄수화물</b></div>
              <b className="carbohydrateValue">{Number(item.item.carbohydrate).toFixed(3)}g</b> 
              <Progress 
                className="carbohydrate" 
                type="line" 
                percent={item.item.carbohydrate / NEED[0].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="sugarsName">
              <div className="sugarsLabel"><b className="sugarsLabelTxt">당류</b></div>
              <b className="sugarsValue">{Number(item.item.sugars).toFixed(3)}g</b> 
              <Progress 
                className="sugars" 
                type="line" 
                percent={item.item.sugars / NEED[1].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="proteinName">
              <div className="proteinLabel"><b className="proteinLabelTxt">단백질</b></div>
              <b className="proteinValue">{Number(item.item.protein).toFixed(3)}g</b> 
              <Progress 
                className="protein" 
                type="line" 
                percent={item.item.protein / NEED[2].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="provinceName">
              <div className="provinceLabel"><b className="provinceLabelTxt">지방</b></div>
              <b className="provinceValue">{Number(item.item.province).toFixed(3)}g</b> 
              <Progress 
                className="province" 
                type="line" 
                percent={item.item.province / NEED[3].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[3, 3]} justify="space-between">
          <Col span={11}>
            <div className="saturated_fatty_acidsName">
              <div className="saturated_fatty_acidsLabel"><b className="saturated_fatty_acidsLabelTxt">포화지방</b></div>
              <b className="saturated_fatty_acidsValue">{Number(item.item.saturated_fatty_acids).toFixed(3)}g</b> 
              <Progress 
                className="saturated_fatty_acids" 
                type="line" 
                percent={item.item.saturated_fatty_acids / NEED[4].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="cholesterolName">
              <div className="cholesterolLabel"><b className="cholesterolLabelTxt">콜레스테롤</b></div>
              <b className="cholesterolValue">{Number(item.item.cholesterol).toFixed(3)}g</b> 
              <Progress 
                className="cholesterol" 
                type="line" 
                percent={item.item.cholesterol / NEED[5].value * 100}
                format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
              />
            </div>
          </Col>
        </Row>
          <div className="saltName">
            <div className="saltLabel"><b className="saltLabelTxt">나트륨</b></div>
            <b className="saltValue">{Number(item.item.salt).toFixed(3)}mg</b> 
            <Progress 
              className="salt" 
              type="line" 
              percent={item.item.salt / NEED[6].value * 100}
              format={(percent) => (<b>{percent.toFixed(0)}%</b>)}
            />
          </div>
      </Card>
    );
  }

  return (
    <div className="App">
      {isLoading ? <Logo/> : (
        <div className="bonobono">
          {StatusShow1()}
          <AutoComplete className="auto" placeholder="김치찌개" onSearch={handleSearch} onSelect={(e) => setSearch(e)}>
            {
              candidate.map((item, index) => (
                <AutoComplete.Option key={item.name}>{item.name}</AutoComplete.Option>
              ))
            }
          </AutoComplete>
          <div className="buttonContainer">
            <Button className="buttonContainer" type="primary" onClick={onPush}>선택</Button>
            <Button className="buttonContainer" danger={true} type="primary" className="cancle" onClick={() => onCancle(0)}>
              초기화
            </Button>
          </div>
          <div className="beforeContainer">
            <div className="beforeLabel">
              이전에 먹은 음식
            </div>
            {beforeData.length>0 && beforeData.map((item, index) => <FoodCard item={item} index={index}/>)}
          </div>
          <Button className="predictBtn" type="primary" onClick={onPredict}>예측</Button>
          <div className="predictContainer">
            <div className="predictLabel">
              예측결과
            </div>
            {predictData.length>0 && predictData.map((item) => <PredictCard item={item}/>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
