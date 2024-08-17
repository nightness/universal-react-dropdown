import FadeInComponent from "@components/FadeInComponent/FadeInComponent";
import { Page } from "@components/index";

import { Dropdown, DropdownVisibility } from "@components/Dropdown/Dropdown/Dropdown";
import { ArrowComponentProps } from "@components/Dropdown/types";
// import { ArrowComponentProps, Dropdown, DropdownVisibility } from "universal-react-dropdown";

import "./TestPage.css";

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' },
  { id: 10, name: 'Item 10' },
  { id: 11, name: 'Item 11' },
  { id: 12, name: 'Item 12' },
  { id: 13, name: 'Item 13' },
  { id: 14, name: 'Item 14' },
  { id: 15, name: 'Item 15' },
  { id: 16, name: 'Item 16' },
  { id: 17, name: 'Item 17' },
  { id: 18, name: 'Item 18' },
  { id: 19, name: 'Item 19' },
  { id: 20, name: 'Item 20' },
  { id: 21, name: 'Item 21' },
  { id: 22, name: 'Item 22' },
  { id: 23, name: 'Item 23' },
  { id: 24, name: 'Item 24' },
  { id: 25, name: 'Item 25' },
  { id: 26, name: 'Item 26' },
  { id: 27, name: 'Item 27' },
  { id: 28, name: 'Item 28' },
  { id: 29, name: 'Item 29' },
];

export default function Home() {
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const renderItem = (item: Item | null, index: number, isSelected: boolean) => (
    <div style={{ minHeight: '22px', fontWeight: isSelected ? '800' : '400' }}>{item?.name}</div>
  );

  const onSelect = () => {
    // console.log('Selected item:', item);
    // setSelectedItem(item);
  };

  return (
    <Page
      style={{
      }}
    >
      <FadeInComponent
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '25vh',
        }}>
          <div>Dropdown Component 1</div>
          <Dropdown
            // ArrowComponent={ArrowComponent}
            // allowNoSelection
            // width={300}
            padding={5}            
            items={items}
            renderItem={renderItem}
            placeholder={{ text: 'Select an item', color: 'black', fontSize: 16, fontWeight: 300 }}
            onSelect={onSelect}
            border={{ width: 3, style: 'solid', radius: 5, color: 'green' }}
            // border='3px solid green'
            componentStyle={{
              // arrowColor: 'blue',
              // arrowBorderColor: 'yellow',
              backgroundColor: 'lightgray',
            }}
            dropdownStyle={{
              animationDuration: 700,
              backgroundColor: 'silver',
              hoverColor: 'orange',
              maxDropHeight: 300,
              separatorColor: 'gray',
              selectedBackgroundColor: 'lightblue',
              selectedColor: 'black',
              separatorThickness: 2,
              separatorStyle: 'dotted'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '25vh',
        }}>
          <div>Dropdown Component 2</div>
          <Dropdown
            ArrowComponent={ArrowComponent}
            allowNoSelection
            width={300}
            padding={5}
            // maxDropHeight={220}
            items={items}
            renderItem={renderItem}
            placeholder={{ text: 'Select an item', color: 'black', fontSize: 16, fontWeight: 300 }}
            onSelect={onSelect}
            border={{ width: 2, style: 'solid', radius: 5, color: 'gold' }}
            // border='3px solid green'
            componentStyle={{
              // arrowColor: 'blue',
              // arrowBorderColor: 'yellow',
              border: {
                width: 2,
                style: 'solid',
                radius: 25,
                color: 'gold',
              },
              backgroundColor: 'lightgray',
            }}
            dropdownStyle={{
              backgroundColor: 'silver',
              hoverColor: 'orange',
              maxDropHeight: 200,
              separatorColor: 'gray',
              selectedBackgroundColor: 'lightblue',
              selectedColor: 'black',
              separatorThickness: 2,
              separatorStyle: 'dotted'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '25vh',
        }}>
          <div>Dropdown Component 3</div>
          <Dropdown
            allowNoSelection
            width={300}
            padding={5}
            // maxDropHeight={220}
            items={items}
            renderItem={renderItem}
            placeholder={{ text: 'Select an item', color: 'black', fontSize: 16, fontWeight: 300 }}
            onSelect={onSelect}
            // border={{ width: 1, style: 'solid', radius: 5, color: 'white' }}
            // border='3px solid green'
            componentStyle={{
              // arrowColor: 'blue',
              // arrowBorderColor: 'yellow',
              backgroundColor: 'lightgray',
            }}
            dropdownStyle={{
              backgroundColor: 'silver',
              dropdownDirection: 'up',
              hoverColor: 'orange',
              separatorColor: 'gray',
              selectedBackgroundColor: 'lightblue',
              selectedColor: 'black',
              separatorThickness: 2,
              separatorStyle: 'dotted'
            }}
          />
        </div>
      </FadeInComponent>
    </Page>
  );
}

function ArrowComponent({ visibility, color, borderColor, animationDuration }: ArrowComponentProps) {
  return (
    <>
      <svg
        viewBox='0 0 30 30'
        xmlns='http://www.w3.org/2000/svg'
        height='30' width='30'
        style={{

          // Clockwise rotation
          transform: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 'rotate(45deg)' : 'rotate(-135deg)',

          // Counter-clockwise rotation
          // transform: visibility === DropdownVisibility.Open || visibility === DropdownVisibility.Opening ? 'rotate(45deg)' : 'rotate(225deg)',

          transition: `transform ${
            animationDuration / 1000
          }s ease`,
        }}
      >
        <rect x='25%' y='25%' width='25%' height='25%' fill='tomato' opacity='0.75' />
        <rect x='25%' y='50%' width='25%' height='25%' fill='slategrey' opacity='0.75' />
        <rect x='50%' y='25%' width='25%' height='25%' fill='olive' opacity='0.75' />
      </svg>
    </>
  );
}