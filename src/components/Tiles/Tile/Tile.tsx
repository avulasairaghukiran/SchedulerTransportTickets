import { FC, useState } from "react";
import { useTheme } from "styled-components";
import { useCalendar } from "../../../context/CalendarProvider";
import { getDatesRange } from "../../../utils/getDatesRange";
import { getTileProperties } from "../../../utils/getTileProperties";
import { BiSolidDownArrow } from "react-icons/bi";
import { getTileTextColor } from "../../../utils/getTileTextColor";
import { NavigateRentalOrder } from "../../../Helpers/RedirectRecord";
import { NavigateSalesOrder } from "../../../Helpers/RedirectRecord";
import {
  // StyledDescription,
  StyledStickyWrapper,
  StyledText,
  StyledTextWrapper,
  StyledTileWrapper
} from "./styles";
import { TileProps } from "./types";

const Tile: FC<TileProps> = ({ row, data, zoom, onTileClick }) => {
  const [visible, setVisible] = useState(false);
  const { date } = useCalendar();
  const datesRange = getDatesRange(date, zoom);
  const { y, x, width } = getTileProperties(
    row,
    datesRange.startDate,
    datesRange.endDate,
    data.startDate,
    data.endDate,
    zoom
  );

  const { colors } = useTheme();
  const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);
 
  return (
    <StyledTileWrapper
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: `${data.bgColor ?? colors.defaultTile}`,
        width: `${width}px`,
        color: getTileTextColor(data.bgColor ?? "")
      }}
      className={` cursor-pointer`} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}
      onClick={() => onTileClick?.(data)}>

        {visible && (
            <div
            className={`bg-black text-white absolute p-3 -top-${
              data.salesorder && data.rentalorder && data.formateddeliverydate ? "20" : "16"
            } z-50 rounded-md text-xs w-60 flex flex-col gap-1`}
            style={{ backgroundColor: "rgb(0,55,92)" }}
            >
            <div>
              <b>{data.title}</b>
            </div>
            {data.salesorder && (
              <div onClick={() => NavigateSalesOrder(data.salesorderid)}>
              SalesOrder: <b>{data.salesorder}</b>
              </div>
            )}
            {data.rentalorder && (
              <div onClick={() => NavigateRentalOrder(data.rentalorderid)}>
              RentalOrder: <b>{data.rentalorder}</b>
              </div>
            )}
            {data.formateddeliverydate && (
              <div>
              Delivery Date: <b>{data.formateddeliverydate}</b>
              </div>
            )}
            <BiSolidDownArrow
              className="absolute -bottom-2 rounded-sm"
              style={{ color: "rgb(0,55,92)" }}
            />
            </div>
        )}
      <StyledTextWrapper >
        <StyledStickyWrapper >
          <StyledText bold>{data.title}</StyledText>
        </StyledStickyWrapper>
      </StyledTextWrapper>
    </StyledTileWrapper>
  
  );
};

export default Tile;
