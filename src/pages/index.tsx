import { useState } from 'react';

import {
  Avatar,
  Breadcrumb,
  Breadcrumbs,
  Checkbox,
  ContextMenu,
  ContextMenuConfigure,
  Dropdown,
  Loader,
  ProgressBar,
  Radio,
  Toggle,
  Tooltip,
  MenuType,
  DropdownMenu,
  Card,
  Stepper,
  Steps,
  Step,
  List,
  ListMenu,
  Tabs,
  TabItem,
} from '@/components';
import { MenuProp } from '@/components/Menu';
import { ArrowDownIcon } from '@/icons';

export default function Layout() {
  const [state, setState] = useState(false);
  const handleClick = () => setState(!state);
  const menus: MenuType[] = [
    {
      label: 'label1',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      onClick() {},
    },
    {
      label: 'label2',
      onClick() {},
    },
    {
      label: 'label3',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      onClick() {},
    },
    {
      label: 'label4',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      onClick() {},
    },
    {
      label: 'label5',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      onClick() {},
    },
  ];
  const menusDropDown: DropdownMenu[] = [
    {
      label: 'Option 1',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      label: 'Option 2',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      disabled: true,
    },
    {
      label: 'Option 3',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      label: 'Option 4',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      label: 'Option 5',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
    },
    {
      label: 'Option 6',
      icon: (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="star">
            <path
              id="Path"
              d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      ),
      checked: true,
      disabled: true,
    },
  ];

  const data: Step[] = [
    {
      label: 'Step 1',
      step: 1,
    },
    {
      label: 'Step 2',
      step: 2,
    },
    {
      label: 'Step 3',
      step: 3,
    },
    {
      label: 'Step 4',
      step: 4,
    },
  ];

  const data1: ListMenu[] = [
    {
      label: 'Value1',
    },
    {
      label: 'Value2',
    },
  ];

  const TabItem : TabItem[] = [
    {
      label:'TabItem1',
      children: 'ContentItem 1'
    },
    {
      label:'TabItem2',
      children: 'ContentItem 2'
    }
  ];

  const handleChange = (s: (DropdownMenu | string)[]) => console.log(s);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // height: "100vh",
          gap: '10px',
          padding: '20%',
        }}
      >
        {/* <Checkbox
					label="vvv"
					// indeterminate
					position="left"
					// onChange={handleClick}
					// checked={state}
					// disabled
				></Checkbox> */}
        {/* <Radio
					label="vvv"
					// disabled
					position=""
					// checked={state}
					// onChange={handleClick}
				></Radio> */}
        {/* <Toggle
					// disabled
					position="right"
					// checked={state}
					// onChange={handleClick}
					label="Toggle Switch"
				></Toggle> */}

        {/* <Tooltip
					title="Hay click vao day!"
					position="bottomLeft"
					trigger="hover"
				>
					<p>vvvv</p>
				</Tooltip> */}
        {/* <Avatar status="away" size="tiny" text="GL" /> */}
        {/* <Loader size="tiny" animated/> */}

        {/* <Breadcrumbs /> */}

        {/**C1 */}
        {/* <ContextMenuConfigure
					customContextMenu={
					<ContextMenu>
						<ContextMenu.Item>sss</ContextMenu.Item>
						<ContextMenu.Item>ddd</ContextMenu.Item>
					</ContextMenu>}
				>
					<button>Test</button>
				</ContextMenuConfigure> */}

        {/**C2 */}
        {/* <ContextMenuConfigure
					customContextMenu={<ContextMenu items={menus}/>}
				>
					<button>Test</button>
				</ContextMenuConfigure> */}

        {/**C3 */}
        {/* <ContextMenuConfigure menu={menus} anchor="bottom">
					<button>Test</button>
				</ContextMenuConfigure> */}
        {/* <Dropdown
					leftIcon={
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="star">
								<path
									id="Path"
									d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
						</svg>
					}
					menus={menusDropDown}
					onChange={(val) => handleChange(val)}
					// disabled
				></Dropdown> */}

        {/** ======================  Card ============== */}
        {/* <Card type="Vertical" title="" content=""/> */}

        {/** ======================  Stepper ============== */}
        {/* <Stepper disabled={false}/> */}

        {/** ======================  Steps ============== */}
        {/* <Steps data={data}/> */}

        {/** ======================  List ============== */}
        {/* <List data={data1} showImage icon={<ArrowDownIcon />}>
					<List.Item>A</List.Item>
					<List.Item>B</List.Item>
				</List> */}

        {/** ======================  Tabs ============== */}
        <Tabs data={TabItem} defaultTab="1">
          <Tabs.TabsPane label="Tab1" 
            rightIcon={<ArrowDownIcon/>} leftIcon={<ArrowDownIcon/>}
          >
            <div style={{ height: '400px' }}>Content 1</div>
          </Tabs.TabsPane>
          <Tabs.TabsPane label="Tab2">
            <div style={{ height: '400px' }}>Content 2</div>
          </Tabs.TabsPane>
          <Tabs.TabsPane label="Tab3">
            <div style={{ height: '400px' }}>Content 3</div>
          </Tabs.TabsPane>
          <div>sss</div>
        </Tabs>
      </div>
      {/* <ProgressBar position="right" value={90.5} animated /> */}
    </>
  );
}
