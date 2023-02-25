import {
  Button as ButtonBootstrap,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const Button = ({ content, tooltip, ...props }) => {
  return !!tooltip ? (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
    >
      <ButtonBootstrap {...props} className="m-2">
        {content}
      </ButtonBootstrap>
    </OverlayTrigger>
  ) : (
    <ButtonBootstrap {...props} className="m-2">
      {content}
    </ButtonBootstrap>
  );
};

export default Button;
